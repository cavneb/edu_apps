class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :name, unique: true, null: false

      t.timestamps
    end
  end
end
