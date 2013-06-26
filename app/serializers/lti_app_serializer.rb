class LtiAppSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :description, :testing_instructions, :author_name, :app_type, :ims_cert_url, 
             :cartridge, :created_at, :updated_at
end
