class AddImagesToLtiApps < ActiveRecord::Migration
  def change
    add_column :lti_apps, :banner_image_url, :string, limit: 1000
    add_column :lti_apps, :logo_image_url, :string, limit: 1000
    add_column :lti_apps, :icon_image_url, :string, limit: 1000
    add_column :lti_apps, :short_description, :string
  end
end
