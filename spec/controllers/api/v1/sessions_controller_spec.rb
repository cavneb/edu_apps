require 'spec_helper'

describe Api::V1::SessionsController do
  before(:each) do
    @user = User.create!(email: 'foo@example.com', password: 'secret', password_confirmation: 'secret')
  end

  describe "#create" do
    it "with valid credentials" do
      post 'create', { email: 'foo@example.com', password: 'secret' }
      json = JSON.parse(response.body)
      json['user']['id'].should be_present
      json['user']['access_token'].should be_present
      json['user']['email'].should == 'foo@example.com'
      response.code.should == '200'
      session[:user_id].should == json['user']['id']
    end

    it "with invalid credentials" do
      post 'create', { email: 'foo2@example.com', password: 'secret' }
      response.code.should == '422'
      session[:user_id].should be_nil
    end
  end
end
