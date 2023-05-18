from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
print("start")
options=webdriver.EdgeOptions()
options.add_experimental_option('excludeSwitches',['enable-logging'])
driver = webdriver.Edge(options=options)
driver.maximize_window()
driver.get("http://127.0.0.1:3000/login")
driver.find_element("name", "email").send_keys("abhisheksubash25@gmail.com")
time.sleep(3)
driver.find_element("name", "password").send_keys("Abhi@123")
time.sleep(3)
button = driver.find_element(By.ID, "submitbtn")  # Replace "button_id" with the actual ID of the button
button.click()





