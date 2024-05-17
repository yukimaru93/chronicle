class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validate :email_format
  validate :password_complexity

  with_options presence: true do
    validates :name
    validates :nickname
  end

  has_one :calendar

  private

  def email_format
    return if email.blank?
    unless email =~ /\A[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\z/
      errors.add(:email, 'のフォーマットが不正です。正しいメールアドレスを入力してください。')
    end
  end

  def password_complexity
    return if password.blank?
    unless password =~ /\A(?=.*?[a-z])(?=.*?[\d])[a-z\d]+\z/i
      errors.add(:password, 'は英字と数字を両方含む必要があります。')
    end
  end
end
