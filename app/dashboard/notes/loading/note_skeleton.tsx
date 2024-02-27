import React from "react";
import {Card, Skeleton, Spacer, Divider, Button} from "@nextui-org/react";

export default function App() {
  return (
    <>
    <Spacer y={2} />
    <div className="flex space-x-2 mb-4">
        <Button
          size="sm"
          variant="ghost"
          radius="sm"
          isLoading
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
          >All</Button>
           <Button
          size="sm"
          variant="ghost"
          radius="sm"
          isLoading
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
          >COMMON</Button>
           <Button
          size="sm"
          variant="ghost"
          radius="sm"
          isLoading
          spinner={
            <svg
              className="animate-spin h-5 w-5 text-current"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
          }
          >URGENT</Button>

        {/* Add more buttons for other categories */}
      </div>
    <Divider />
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
          <Card className="w-[400px] h-[150px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-20 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-15 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>

            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}
