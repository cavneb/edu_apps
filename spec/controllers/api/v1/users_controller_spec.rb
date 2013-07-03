require 'spec_helper'

describe Api::V1::UsersController do
  before(:each) do
    session[:user_id] = nil
    @user = User.create!(name: 'Foo User', email: 'foo@example.com', password: 'secret', password_confirmation: 'secret')
    @session_api_key = @user.generate_session_api_key
  end

  describe "#authenticate" do
    it "with invalid credentials" do
      post 'authenticate', {}
      response.code.should == '422'
      json = JSON.parse(response.body)
      json['message'].should == 'Invalid email and/or password'
    end

    it "with valid credentials" do
      post 'authenticate', { email: 'foo@example.com', password: 'secret' }
      response.code.should == '200'
      json = JSON.parse(response.body)
      json['token'].length.should > 0
    end
  end

  describe "#index" do
    it "without access token" do
      get 'index'
      response.code.should == '401'
    end

    it "with invalid access token" do
      get 'index', {}, { 'Authorization' => "Bearer 12345" }
      response.code.should == '401'
    end

    it "with valid access token" do
      get 'index', {}, { 'Authorization' => "Bearer #{@session_api_key.access_token}" }
      json = JSON.parse(response.body)
      json['users'].size.should == 1
    end
  end

  describe "#show" do
    it "without access token" do
      get 'show', { id: @user.id }
      response.code.should == '401'
    end

    it "with invalid access token" do
      get 'show', { id: @user.id }, { 'Authorization' => "Bearer 12345" }
      response.code.should == '401'
    end

    it "with valid access token" do
      get 'show', { id: @user.id }, { 'Authorization' => "Bearer #{@session_api_key.access_token}" }
      json = JSON.parse(response.body)
      json['user']['id'].should == @user.id
    end
  end

  it "#create" do
    post 'create', { 
      user: {
        name: 'Joe User',
        email: 'foo2@example.com', 
        password: 'secret', 
        password_confirmation: 'secret',
      }
    }
    json = JSON.parse(response.body)
    json['user']['id'].should be_present
    json['user']['email'].should == 'foo2@example.com'
    json['user']['name'].should == 'Joe User'
  end

  describe "#update" do
    it "with different current user" do
      other_user = User.create!(name: 'Someone Else', email: 'else@example.com', password: 'secret', password_confirmation: 'secret')
      other_session_api_key = other_user.generate_session_api_key

      put 'update', { id: @user.id, user: { email: 'foo3@example.com' }}, { 'Authorization' => "Bearer #{other_session_api_key.access_token}" }
      response.code.should == '403'
    end

    it "with valid data" do
      put 'update', { id: @user.id, user: { email: 'foo3@example.com' }}, { 'Authorization' => "Bearer #{@session_api_key.access_token}" }
      json = JSON.parse(response.body)
      json['user']['email'].should == 'foo3@example.com'
      json['user']['id'].should == @user.id
    end
  end

  describe "#update_password" do
    it "with invalid current password" do
      put 'update_password', { currentPassword: 'blah', newPassword: 'foobar', newPasswordConfirmation: 'foobar' }, { 'Authorization' => "Bearer #{@session_api_key.access_token}" }
      json = JSON.parse(response.body)
      json['errors']['currentPassword'].should == "is not correct"
    end

    it "with mis-matching new passwords" do
      put 'update_password', { currentPassword: @user.password, newPassword: 'foobar', newPasswordConfirmation: 'barfoo' }, { 'Authorization' => "Bearer #{@session_api_key.access_token}" }
      json = JSON.parse(response.body)
      json['errors']['password_confirmation'].should include "doesn't match Password"
    end

    it "with valid data" do
      put 'update_password', { currentPassword: @user.password, newPassword: 'foobar', newPasswordConfirmation: 'foobar' }, { 'Authorization' => "Bearer #{@session_api_key.access_token}" }
      json = JSON.parse(response.body)
      json['user']['id'].should == @user.id
    end
  end
end
