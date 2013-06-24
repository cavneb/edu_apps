module Api
  class BaseController < ApplicationController

    protected

    def restrict_access
      puts "Checked to see if access is restricted"
      head :unauthorized unless current_user
    end

    def current_user
      User.find_by_access_token(params[:access_token])
    end
  end
end