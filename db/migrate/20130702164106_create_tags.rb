class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :short_name, unique: true
      t.string :name
      t.string :context
    end
  end
end
