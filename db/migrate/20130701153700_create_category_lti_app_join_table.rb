class CreateCategoryLtiAppJoinTable < ActiveRecord::Migration
  def change
    create_table :categories_lti_apps do |t|
      t.integer :category_id
      t.integer :lti_app_id
    end

    add_index :categories_lti_apps, [ :category_id, :lti_app_id ], unique: true
  end
end
