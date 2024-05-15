class CalendarsController < ApplicationController
  require "date"
  def index
    @year_time = Time.now.year
    @month_time = Time.now.month
  end

  def calendar_data
    # 現在の年月を取得してカレンダーデータを生成
    year = Time.now.year
    month = Time.now.month

    # Push クラスを使ってデータを生成
    push = Push.new(year, month)
    calendar_data = push.array_pass

    render json: calendar_data
  end
end
