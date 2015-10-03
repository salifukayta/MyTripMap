class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  
  # For APIs, you may want to use :null_session instead.
#  protect_from_forgery with: :exception
  # Turn on request forgery protection
	protect_from_forgery

	before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:login, :firstName, :lastName, :password, :password_confirmation, :email, :address)}
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :password) }
  end
  

	after_filter :set_csrf_cookie_for_ng

	def set_csrf_cookie_for_ng
	  cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

	protected

	def verified_request?
		# In Rails 4.2 and above
		# super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
		# In Rails 4.1 and below
		super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
	end

end
