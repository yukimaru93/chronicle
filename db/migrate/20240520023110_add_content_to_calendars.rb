class AddContentToCalendars < ActiveRecord::Migration[7.0]
  def change
    add_column :calendars, :content, :text
    add_column :calendars, :date, :date
  end
end
