class CreateEducationLevels < ActiveRecord::Migration
  def change
    create_table :education_levels do |t|
      t.string :name
      t.string :short_name
    end
  end
end
