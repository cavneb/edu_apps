class CreateEducationLevelsLtiAppJoinTable < ActiveRecord::Migration
  def change
    create_table :education_levels_lti_apps do |t|
      t.integer :education_level_id
      t.integer :lti_app_id
    end

    add_index :education_levels_lti_apps, [ :education_level_id, :lti_app_id ], name: 'index_edu_level_lti_apps', unique: true
  end
end
