class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string  :email, null: false, unique: true
      t.string  :password_digest, null: false
      t.string  :access_token, null: false, unique: true
      t.string  :organization_name
      t.string  :name
      t.boolean :is_anonymous_tools_only, default: false
      t.boolean :is_auto_approve_tools, default: true

      t.timestamps
    end

    add_index :users, :access_token, unique: true
  end
end
