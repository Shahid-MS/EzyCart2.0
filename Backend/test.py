import json

# Load the JSON data from the file
with open('products2.json', 'r') as file:
    data = json.load(file)

# Update the price field for each product
for product in data:
    product['price'] *= 10

# Write the updated JSON data back to the file
with open('products3.json', 'w') as file:
    json.dump(data, file, indent=2)
