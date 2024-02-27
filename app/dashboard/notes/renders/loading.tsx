import React from "react";
import {Card, CardHeader, CardFooter, Skeleton, Spacer} from "@nextui-org/react";

export default function NoteSkeleton() {
  return (
            <Card
                      isFooterBlurred
                      className="w-full h-[100px] sm:col-span-4 lg:col-span-6"
                      shadow="sm"
                      >
                  <CardHeader className="absolute z-10 flex-col items-start dark:bg-black/60">

                    <div className='col-span-3'>
                    <Skeleton className="rounded-lg">
                      <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                      <h4 className="h-3 w-2/5 rounded-lg bg-default-300"></h4>

                    </div>
                    <div>

                    </div>
                  </CardHeader>
                  <Spacer y={10} />
                  <CardFooter className="justify-between">
                    <div className="flex gap-5">
                    <Skeleton className="rounded-lg">
                      <div className="h-15 w-15 bg-default-300"></div>
                    </Skeleton>
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <Skeleton>

                           <h4 className="h-3 w-4/5 rounded-lg bg-default-200"></h4>
                          </Skeleton>

                        </div>
                        <Skeleton>

                          <span className="h-3 w-3/5 rounded-lg bg-default-200"></span>
                        </Skeleton>

                      </div>
                  </CardFooter>
                </Card>
  );
}

