class LtiAppSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :short_description, :description, :testing_instructions, :author_name, :app_type, :ims_cert_url, 
             :cartridge, :banner_image_url, :logo_image_url, :icon_image_url, :cartridge, :created_at, :updated_at

  # has_many :tags, embed: :ids, include: true
  has_many :tags, embed: :objects

  def short_description
    ret = object.short_description
    if ret.blank?
      ret = object.description
    end
    trancate(ret)
  end

  def trancate(string, length = 150)
    string.size > length+5 ? string[0,length] + "..." : string
  end
end
