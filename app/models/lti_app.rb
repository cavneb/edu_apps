class LtiApp < ActiveRecord::Base
  # Associations
  belongs_to :user
  has_and_belongs_to_many :tags
  # has_and_belongs_to_many :categories
  # has_and_belongs_to_many :education_levels

  # Validations
  validates :short_name, presence: true, uniqueness: true

end
