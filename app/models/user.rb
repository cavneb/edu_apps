class User < ActiveRecord::Base
  has_secure_password

  has_many :lti_apps
  has_many :memberships
  has_many :organizations, through: :memberships
  has_many :api_keys, as: :tokenable 
  
  validates :email, uniqueness: true, format: { with: /.+@.+\..{2,4}/ }
  validates :name, presence: true
  validates :password, :presence => true, :confirmation => true, :length => {:within => 6..40}, on: :create

  def generate_session_api_key
    api_key = api_keys.build(scope: 'session')
    if api_key.save
      return api_key
    else
      raise "Unable to generate api_key"
    end
  end

  def clear_session_api_keys
    api_keys.session.destroy_all
    self.reload
  end

end
