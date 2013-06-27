class AddMembershipToUsersAndOrganizations < ActiveRecord::Migration
  def change
    add_column :users, :membership_id, :integer
    add_column :organizations, :membership_id, :integer
  end
end
