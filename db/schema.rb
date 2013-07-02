# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20130702164228) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: true do |t|
    t.string "name"
    t.string "short_name"
  end

  create_table "categories_lti_apps", force: true do |t|
    t.integer "category_id"
    t.integer "lti_app_id"
  end

  add_index "categories_lti_apps", ["category_id", "lti_app_id"], name: "index_categories_lti_apps_on_category_id_and_lti_app_id", unique: true, using: :btree

  create_table "education_levels", force: true do |t|
    t.string "name"
    t.string "short_name"
  end

  create_table "education_levels_lti_apps", force: true do |t|
    t.integer "education_level_id"
    t.integer "lti_app_id"
  end

  add_index "education_levels_lti_apps", ["education_level_id", "lti_app_id"], name: "index_edu_level_lti_apps", unique: true, using: :btree

  create_table "lti_apps", force: true do |t|
    t.integer  "user_id",                                               null: false
    t.string   "short_name",                                            null: false
    t.string   "name",                                                  null: false
    t.text     "description"
    t.string   "status",                            default: "pending", null: false
    t.text     "testing_instructions"
    t.string   "support_url",          limit: 1000
    t.string   "author_name"
    t.boolean  "is_public"
    t.string   "app_type"
    t.string   "ims_cert_url",         limit: 1000
    t.string   "preview_url",          limit: 1000
    t.string   "config_url",           limit: 1000
    t.string   "data_url",             limit: 1000
    t.json     "cartridge"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "banner_image_url",     limit: 1000
    t.string   "logo_image_url",       limit: 1000
    t.string   "icon_image_url",       limit: 1000
    t.string   "short_description"
  end

  add_index "lti_apps", ["short_name"], name: "index_lti_apps_on_short_name", unique: true, using: :btree
  add_index "lti_apps", ["user_id"], name: "index_lti_apps_on_user_id", using: :btree

  create_table "lti_apps_tags", force: true do |t|
    t.integer "lti_app_id"
    t.integer "tag_id"
  end

  add_index "lti_apps_tags", ["lti_app_id", "tag_id"], name: "index_lti_apps_tags", unique: true, using: :btree

  create_table "memberships", force: true do |t|
    t.integer  "organization_id", null: false
    t.integer  "user_id",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_admin"
  end

  create_table "organizations", force: true do |t|
    t.string   "name",          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "membership_id"
  end

  create_table "tags", force: true do |t|
    t.string "short_name"
    t.string "name"
    t.string "context"
  end

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "access_token",    null: false
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "membership_id"
  end

  add_index "users", ["access_token"], name: "index_users_on_access_token", unique: true, using: :btree

end
