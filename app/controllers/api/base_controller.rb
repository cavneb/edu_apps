module Api
  class BaseController < ApplicationController

    protected

    def restrict_access
      # puts "Checked to see if access is restricted"
      head :unauthorized unless current_user
    end

    def current_user
      token = params[:access_token] || params[:user][:access_token] rescue nil
      user = User.find_by_access_token(token)

      puts "session[:user_id] => #{session[:user_id]}"
      puts "            token => #{token}"
      puts "             user => #{user.to_s}"

      if session[:user_id] && user && session[:user_id] == user.id
        return user
      else
        return nil
      end
    end
  end
end