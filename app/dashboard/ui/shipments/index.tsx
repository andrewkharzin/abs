"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { DotsIcon } from "@/app/dashboard/ui/icons/accounts/dots-icon";
import { ExportIcon } from "@/app/dashboard/ui/icons/accounts/export-icon";
import { InfoIcon } from "@/app/dashboard/ui/icons/accounts/info-icon";
import { TrashIcon } from "@/app/dashboard/ui/icons/accounts/trash-icon";
import { HouseIcon } from "@/app/dashboard/ui/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/app/dashboard/ui/icons/breadcrumb/users-icon";
import { SettingsIcon } from "@/app/dashboard/ui/icons/sidebar/settings-icon";
import  AWBTable from "@/app/dashboard/ui/table/shipments/shipments_table";
// import { AddUser } from "./add-user";

export const Shipments = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          {/* <HouseIcon /> */}
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Books</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span className="pl-2">List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">My Books</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          {/* <AddUser /> */}
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <AWBTable />
      </div>
    </div>
  );
};
