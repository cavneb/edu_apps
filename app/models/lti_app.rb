class LtiApp < ActiveRecord::Base

  # Associations
  belongs_to :user
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :education_levels

end
