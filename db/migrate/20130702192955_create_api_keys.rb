class CreateApiKeys < ActiveRecord::Migration
  def change
    create_table :api_keys do |t|
      t.string :access_token
      t.integer :tokenable_id
      t.string :tokenable_type
      t.string :scope, default: 'session' # ['session', 'api']
      t.timestamps
    end
  end
end
