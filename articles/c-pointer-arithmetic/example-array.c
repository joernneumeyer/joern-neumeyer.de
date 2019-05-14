#include <stdlib.h>
#include <stdio.h>

int sum(int* arr, int count) {
  int result = 0;
  for (int i = 0; i < count; ++i) {
    result += arr[i];
  }
  return result;
}

int main() {
  int local_array[5];
  int other_local_array[] = { 1, 2, 3, 4, 5 };
  int* heap_array = (int*)malloc(sizeof(int) * 5);
  sum(local_array, 5);
  sum(other_local_array, 5);
  sum(heap_array, 5);
  return 0;
}
