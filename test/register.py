import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import UnexpectedAlertPresentException

service = Service(executable_path=r"test\msedgedriver.exe")
driver = webdriver.Chrome(service=service)

def handle_alert():
    try:
        alert = driver.switch_to.alert
        print("Alert text:", alert.text)
        alert.dismiss()
    except UnexpectedAlertPresentException:
        pass

driver.get("http://127.0.0.1:3000/login")
username_field = driver.find_element(By.NAME, "email")
username_field.send_keys("abhisheksubash25@gmail.com")
password_field = driver.find_element(By.NAME, "password")
password_field.send_keys("Abhi@123")
password_field.send_keys(Keys.RETURN)
dashboard_element = driver.find_element(By.XPATH, "/html/body/div[1]/div[1]/header/div[1]/div/div/div[3]/div/ul/li[3]/div/ul/li[2]").click()


driver.get("http://localhost:3000/productpage")
time.sleep(5)
driver.quit()
