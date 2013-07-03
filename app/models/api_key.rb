class ApiKey < ActiveRecord::Base
  belongs_to :tokenable, polymorphic: true
  before_create :generate_access_token
  validates :scope, presence: true, inclusion: { in: %w( session api ) }

  scope :session, -> { where(scope: 'session') }

  def self.generate_session_token
    ApiKey.create(scope: 'session')
  end

  def self.generate_api_token
    ApiKey.create(scope: 'api')
  end

  def self.context_for(token)
    api_key = where(:access_token => token).first
    if api_key
      api_key.tokenable
    else
      nil
    end
  end

  def self.user_for(token)
    ctx = context_for(token)
    if ctx && ctx.is_a?(User)
      ctx
    else
      nil
    end
  end

  private

  def generate_access_token
    begin
      self.access_token = SecureRandom.hex
    end while self.class.exists?(access_token: access_token)
  end
end
