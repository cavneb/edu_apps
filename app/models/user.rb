class User < ActiveRecord::Base
  has_secure_password

  has_many :lti_apps
  has_many :memberships
  has_many :organizations, through: :memberships
  
  before_create :generate_access_token
  
  validates :email, uniqueness: true, format: { with: /.+@.+\..{2,4}/ }
  validates :name, presence: true
  validates :password, :presence => true, :confirmation => true, :length => {:within => 6..40}

  private

  def generate_access_token
    begin
      self.access_token = SecureRandom.hex
    end while self.class.exists?(access_token: access_token)
  end
end
