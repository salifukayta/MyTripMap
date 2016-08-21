# MyTripMap to be deleted
A way of organizing / viewing your pictures in the place where it was taken.

To install this app web, you have to launch these commands :
- Do: bundle install
- Install ImageMagick based on your OS. (http://www.imagemagick.org/script/binary-releases.php)
- In the file conf\envirenments\development.rb : 
Paperclip.options[:command_path] = imagemagic_path_in_your_system
