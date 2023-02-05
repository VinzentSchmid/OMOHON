# Water-Tracking - Orte


## Overview

On overview page you can see all the places you have added. You can also add new places by clicking on the plus button. You can also delete places by clicking on the trash button. You can also edit places by clicking on the edit button. You can also see the details by clicking on the location row.

Additionaly you can click on the export button (icon) to export all the data to a csv file. More details about the export can be found in the export section.

## Edit/Add

On the edit/add page you can add a new place or edit an existing one. You can add an address, and a picture. The location can be added by clicking on the save button. The address will be converted to a location and the map will be centered on that location. You can also add a picture by clicking on the picture icon.

When a new location is added or updated, longitude and latitude will be saved in the database. The longitude and latitude will be used to show the location on the map. Additionally with the longitude and latitude insertion, it is also a validation that the address is valid.
## Delete

When you click on the trash button, you will be asked to confirm the deletion. If you click on the delete button, the location will be deleted from the database. If you click on the cancel button, the location will not be deleted.

If a location is deleted, all water entries for that location will not be deleted. The location will be set to null for all water entries.
## Integrate location selection with water tracking

With the watertracking integration, we made a sidebar that can be used to switch between the watertracking entrances and location entrances. Furthermore, we added a location row to the watertracking entrance. The location row will show the location name and the location address. If the location is not set, there is a dropdown window where you can choose one of the locations, which were added before or you can add a new location.

## Upload Picture

When you add a new location or edit an existing one you can add a picture. The picture will be converted to base64 and saved in the database. The picture will be shown on the details page, and on the edit page.

## Export Datas:

When you click on the export button, the locations will be exported to a csv file. The csv file will be downloaded to your computer where you want to store the data. 

## Vinzent Schmid Tasks:

My main task was to design the whole "website" and to implement the delete function.

My inspiration for the design was ChatGPT, and I tried to make it look similar to that. For designing the fronted I only used CSS.

Here you can see the design of the website:

![OverviewWaterEntries](public/images/doc/overViewPageWaterEntries.png)
![OverviewLocations](public/images/doc/overViewPageLocations.png)
![EditLocations](public/images/doc/EditLocations.png)
![img.png](public/images/doc/AddWaterEntry.png)

I also implemented the delete function, which is pretty simple. I just added a button to the location overview page, which opens a modal, where you can confirm the deletion. If you click on the delete button, the location will be deleted from the database. If you click on the cancel button, the location will not be deleted.

## Emanuel Neziraj Tasks:


## Julian Kapellari Tasks:


## Abdullah Kaitoua Tasks:
# Water-Tracking - Orte


## Overview

On overview page you can see all the places you have added. You can also add new places by clicking on the plus button. You can also delete places by clicking on the trash button. You can also edit places by clicking on the edit button. You can also see the details by clicking on the location row.

Additionaly you can click on the export button (icon) to export all the data to a csv file. More details about the export can be found in the export section.

## Edit/Add

On the edit/add page you can add a new place or edit an existing one. You can add an address, and a picture. The location can be added by clicking on the save button. The address will be converted to a location and the map will be centered on that location. You can also add a picture by clicking on the picture icon.

When a new location is added or updated, longitude and latitude will be saved in the database. The longitude and latitude will be used to show the location on the map. Additionally with the longitude and latitude insertion, it is also a validation that the address is valid.
## Delete

When you click on the trash button, you will be asked to confirm the deletion. If you click on the delete button, the location will be deleted from the database. If you click on the cancel button, the location will not be deleted.

If a location is deleted, all water entries for that location will not be deleted. The location will be set to null for all water entries.
## Integrate location selection with water tracking

With the watertracking integration, we made a sidebar that can be used to switch between the watertracking entrances and location entrances. Furthermore, we added a location row to the watertracking entrance. The location row will show the location name and the location address. If the location is not set, there is a dropdown window where you can choose one of the locations, which were added before or you can add a new location.

## Upload Picture

When you add a new location or edit an existing one you can add a picture. The picture will be converted to base64 and saved in the database. The picture will be shown on the details page, and on the edit page.

## Export Datas:

When you click on the export button, the locations will be exported to a csv file. The csv file will be downloaded to your computer where you want to store the data.

## Vinzent Schmid Tasks:

My main task was to design the whole "website" and to implement the delete function.

My inspiration for the design was ChatGPT, and I tried to make it look similar to that. For designing the fronted I only used CSS.

Here you can see the design of the website:

![OverviewWaterEntries](public/images/doc/overViewPageWaterEntries.png)
![OverviewLocations](public/images/doc/overViewPageLocations.png)
![EditLocations](public/images/doc/EditLocations.png)
![img.png](public/images/doc/AddWaterEntry.png)

I also implemented the delete function, which is pretty simple. I just added a button to the location overview page, which opens a modal, where you can confirm the deletion. If you click on the delete button, the location will be deleted from the database. If you click on the cancel button, the location will not be deleted.

## Emanuel Neziraj Tasks:


## Julian Kapellari Tasks:


## Abdullah Kaitoua Tasks:

1- add a search function:
-Define a search endpoint
-Parse the query parameters from the search request.
-Connect to the database and run a query to retrieve the data based on the search parameters.
- Format the retrieved data and return it in the response.

### Search by Location

If the type parameter is set to "location", the code will perform a search on the locations table in the database. The search will look for matches in the columns street, housenumber, postalcode, city, and country. The results are filtered using the LIKE SQL operator with the % wildcard symbol, allowing for partial string matches. The query is executed using the db.search() method, which returns a Promise. If the Promise is resolved, the locations result set is sent as a response with a status code of 200, using the res.status(200).send() method. If the Promise is rejected, the errorView function is called with the error, which generates an error response to be sent to the client.
### Search by Water

If the type parameter is set to "water", the code will perform a search on the waterentries table in the database, joining it with the locations table. The search will look for matches in the type column. The results are filtered using the LIKE SQL operator with the % wildcard symbol, allowing for partial string matches. The query is executed using the db.search() method, which returns a Promise. If the Promise is resolved, the db.getAllLocations() method is called to retrieve all location data from the locations table. If this Promise is resolved, the getWaterEntriesList function is called with the search results and all location data, generating a response to be sent to the client. If either Promise is rejected, the errorView function is called with the error, which generates an error response to be sent to the client.

2- export locations from datebase to csv file  using fast-csv


### CSV Exporter

This module exports data from a database to a CSV file. It uses the fast-csv library to stream the data and send it as a download to the client.
Options

The options object passed to the csv.write method is used to configure the CSV file. The following properties are set:

    headers: This is set to true to include the headers in the first row of the file.
    delimiter: This is set to ; to separate the values with a semicolon.
    quoted_string: This is set to true to wrap string values in quotes.
    encoding: This is set to utf8 to specify the character encoding of the file.

### Data

The db.getAllLocations method is used to query the database and retrieve all the locations. The results are mapped to a new object with the properties id, latitude, longitude, street, housenumber, postalcode, city, and country. This data is then written to the CSV file.

### Response

The response headers are set to specify the content type as text/csv; charset=UTF-8 and the content disposition as attachment; filename="locations.csv". This will cause the browser to prompt the user to download the file as locations.csv. The data is then streamed to the response object using the csv.write method.

### Error Handling

In case of any error, the errorView function is called and the error message is sent to the client with a status code of 500.

## Marin Sekic Tasks:


## Mohammed Alamer Tasks:

I had several Tasks, one Main task was to implement the feature of uploading an image or add an image to the location.
I implemented this task by breaking it into several smaller tasks and then solved each one at a time:

- Create a button that opens the file explorer
- Allow only images
- allow uploading max. 1 image
- convert the image into a base64 string in order to save
- dispaly the image in location details

### Contributors:

Mohammed Alamer, Marin Sekic, Abdullah Kaitoua, Julian Kapellari, Emanuel Neziraj, Vinzent Schmid


