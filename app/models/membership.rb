class Membership < ActiveRecord::Base
  belongs_to :user
  belongs_to :organization

  def self.first_or_create_with(user_id, organization_id)
    membership = where(:user_id => user_id).
                 where(:organization_id => organization_id).
                 first_or_create(is_admin: true)
    membership
  end
end
