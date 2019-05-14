#include <stdio.h>
// a function in form a2 * x^2 + a1 * x + a0
typedef struct {
  double a2, a1, a0;
} function_t;
// calculate the difference and write it to func_result
int subtract_functions(function_t* func1, function_t* func2, function_t* func_result) {
  func_result->a2 = func1->a2 - func2->a2;
  func_result->a1 = func1->a1 - func2->a1;
  (*func_result).a0 = func1->a0 - func2->a0;
}

int main() {
  function_t first_func = { 2.0d, 12.0d, 18.0d };
  function_t second_func = { 1.0d, 14.0d, 16.0d };
  function_t diff_func;
  subtract_functions(&first_func, &second_func, &diff_func);
  printf("The resulting function is: (%.2f*x^2) + (%.2f*x) + (%.2f)\r\n", diff_func.a2, diff_func.a1, diff_func.a0);
  return 0;
}
