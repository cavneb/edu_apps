require 'spec_helper'

describe Api::V1::UsersController do
  before(:each) do
    session[:user_id] = nil
    @user = User.create!(name: 'Foo User', email: 'foo@example.com', password: 'secret', password_confirmation: 'secret')
  end

  describe "#index" do
    it "without access token" do
      get 'index'
      response.code.should == '401'
    end

    it "with invalid access token" do
      get 'index', { 'access_token' => '12345' }
      response.code.should == '401'
    end

    it "with valid access token" do
      session[:user_id] = @user.id
      get 'index', { 'access_token' => @user.access_token }
      json = JSON.parse(response.body)
      json['users'].size.should == 1
    end
  end

  it "#create" do
    post 'create', { 
      user: { 
        name: 'Foo Two',
        email: 'foo2@example.com', 
        password: 'secret', 
        password_confirmation: 'secret',
        name: 'Joe User',
        organization: 'Instructure'
      }
    }
    json = JSON.parse(response.body)
    json['user']['email'].should == 'foo2@example.com'
    json['user']['access_token'].should be_present
    json['user']['id'].should be_present
    json['user']['name'].should == 'Joe User'
    json['user']['organization'].should == 'Instructure'
  end

  it "#update" do
    post 'update', { id: @user.id, user: { email: 'foo3@example.com' }}
    json = JSON.parse(response.body)
    json['user']['email'].should == 'foo3@example.com'
    json['user']['access_token'].should == @user.access_token
    json['user']['id'].should == @user.id
  end
end
