class User < ActiveRecord::Base
  has_secure_password

  belongs_to :organization
  has_many :lti_apps
  
  before_create :generate_access_token
  
  validates :email, uniqueness: true, format: { with: /.+@.+\..{2,4}/ }

  private

  def generate_access_token
    begin
      self.access_token = SecureRandom.hex
    end while self.class.exists?(access_token: access_token)
  end
end
