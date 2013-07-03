class OauthHelper
  class << self

    def parse_token(headers)
      bearer = headers["rack.session"]["Authorization"]
      bearer ||= headers["HTTP_AUTHORIZATION"]
      if bearer.present?
        bearer.split.last
      else
        nil
      end
    end

  end
end