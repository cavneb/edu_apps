class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :organization, :access_token, :is_anonymous_tools_only, :is_auto_approve_tools

  def organization
    object.organization
  end
end
