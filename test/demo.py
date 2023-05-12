from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
print("Register")
options=webdriver.EdgeOptions()
options.add_experimental_option('excludeSwitches',['enable-logging'])
driver = webdriver.Edge(options=options)
driver.maximize_window()
driver.get("http://127.0.0.1:3000/login")
driver.find_element("name", "email").send_keys("abhisheksubash25@gmail.com")
time.sleep(3)
driver.find_element("name", "password").send_keys("Abhi@123")
time.sleep(3)
driver.find_element("xpath", "/html/body/div/div/div/div/form/h1[2]/input").click()
driver.get("http://localhost/MINI%20PROJECT/det/multilogin/dashtreme-master/dashboard.html")
driver.get("http://localhost/MINI%20PROJECT/det/multilogin/dashtreme-master/update-progress.php?email=yiya@gmail.com")

driver.find_element("name", "ini_weight").send_keys("70")
time.sleep(3)
driver.find_element("name", "curr_weight").send_keys("60")
time.sleep(3)
driver.find_element("name", "ini_bodytype").send_keys("Fat")
time.sleep(3)
driver.find_element("name", "curr_bodytype").send_keys("Fit")
time.sleep(3)
driver.find_element("xpath", "/html/body/div/div/div/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/button").click()
time.sleep(3)
print("Changes updated")
driver.get("http://localhost/MINI%20PROJECT/det/multilogin/dashtreme-master/view-member-report.php?id=%20134")
time.sleep(3) 