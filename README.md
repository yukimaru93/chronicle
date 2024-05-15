# README


## calendars テーブル

| Column              | Type       | Options                        |
| ------------------- | ---------- | ------------------------------ |
| my_date             | date       | null: false                    |
| content             | string     | null: false                    |
| user                | references | null: false, foreign_key: true |

### Association

- belongs_to :user

## users テーブル

| Column             | Type    | Options     |
| ------------------ | ------- | ----------- |
| email              | string  | null: false, unique: true |
| encrypted_password | string  | null: false |
| name               | string  | null: false |
| nickname           | string  | null: false |


### Association

- has_one :calendar
