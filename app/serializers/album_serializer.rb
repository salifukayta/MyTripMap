# app/serializers/task_serializer.rb
class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :file_name, :creation_date, :comment
    
end