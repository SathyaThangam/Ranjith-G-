"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("Buses", [
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "Volvo travels BUS#0",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "e58fd2c8-54fd-4217-8a6f-9fd1c6f5a821",
				agency_id: "e9172948-6224-4c9b-a0b0-ab24f0c62870",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "Deluxe travels BUS#1",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "e2ebf76f-2ad0-48e7-834d-b402aac09941",
				agency_id: "95c58405-8449-4a72-a2bc-87d4e0e39c76",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "XYZ travels BUS#2",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "15ff0033-fe5a-4238-b534-5e70fe7e97cb",
				agency_id: "24a633f4-2f92-48d8-820f-29428d0145b8",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "FAST travels BUS#3",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "88ed9acd-a6bc-4cdf-a963-baab1ccbc963",
				agency_id: "102a5c72-96ac-46eb-a351-df7bd20af149",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "Volvo travels BUS#4",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "1b17fd5d-11b5-4343-95d1-af9e8d66086e",
				agency_id: "e9172948-6224-4c9b-a0b0-ab24f0c62870",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "Deluxe travels BUS#5",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "ee29ae05-bfa4-4332-96ec-154af42bfd56",
				agency_id: "95c58405-8449-4a72-a2bc-87d4e0e39c76",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "Deluxe travels BUS#6",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "1dbd9c5d-5205-4a92-baf0-d8b42f674ca4",
				agency_id: "95c58405-8449-4a72-a2bc-87d4e0e39c76",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "Deluxe travels BUS#7",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "0f5122d5-22c0-498e-a1aa-18c384327f61",
				agency_id: "95c58405-8449-4a72-a2bc-87d4e0e39c76",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "XYZ travels BUS#8",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "be278935-26b9-4f78-a10f-20191b816751",
				agency_id: "24a633f4-2f92-48d8-820f-29428d0145b8",
			},
			{
				bus_id: uuidv4(),
				num_of_seats: 52,
				bus_name: "XYZ travels BUS#9",
				createdAt: new Date(),
				updatedAt: new Date(),
				route_id: "1b9c55d9-0107-4deb-afdd-bea2ce8d3d53",
				agency_id: "24a633f4-2f92-48d8-820f-29428d0145b8",
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Buses", null, {});
	},
};
