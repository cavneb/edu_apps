class Organization < ActiveRecord::Base
  has_many :memberships
  has_many :users, through: :memberships
  has_many :api_key, as: :tokenable
  
  validates :name, presence: true
end
