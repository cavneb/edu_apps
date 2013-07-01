class Category < ActiveRecord::Base
  has_and_belongs_to_many :lti_apps
end
