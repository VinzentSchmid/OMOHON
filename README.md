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

## Marin Sekic Tasks:

## Mohammed Alamer Tasks:

### Contributors:

Mohammed Alamer, Marin Sekic, Abdullah Kaitoua, Julian Kapellari, Emanuel Neziraj, Vinzent Schmid

