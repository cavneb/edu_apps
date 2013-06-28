module Api
  class BaseController < ApplicationController

    protected

    def restrict_access
      # puts "Checked to see if access is restricted"
      head :unauthorized unless current_user
    end

    def current_user
      user = User.where(id: session[:user_id]).first
      if user
        return user
      else
        session[:user_id] = nil
        return nil
      end
    end
  end
end