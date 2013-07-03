require 'oauth_helper'

module Api
  class BaseController < ApplicationController

    protected

    def restrict_access
      # puts "Checked to see if access is restricted"
      head :unauthorized unless current_user
    end

    def current_context
      ApiKey.context_for(token)
    end

    def current_user
      ApiKey.user_for(token)
    end

    def token
      OauthHelper.parse_token(request.headers)
    end
  end
end