module Api
  module V1
    class SessionsController < Api::BaseController

      def create
        user = User.find_by_email(params[:email])
        if user && user.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user
        else
          render json: { user: nil }
        end
      end

      def destroy
        session[:user_id] = nil
        render json: { message: 'Logged out successfully' }
      end

    end
  end
end
