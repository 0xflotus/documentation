
Agent configurations can be changed with a command line argument. 

The command line arguments should be inserted after the path of the agent and they should be separated by a comma.

### Synopsis

```
-agentpath:<path-to-agent>/lightrun_agent.so=--<parameter>=<value>,--<parameter>=<value>...
```

### Agent parameters

Following are the parameters that can be configured from the terminal. 


| Parameter name                                       | Explanation                                                  | Type   |
| ---------------------------------------------------- | ------------------------------------------------------------ | ------ |
| `hub_retry_delay_ms`                                 | amount of time in milliseconds to sleep before retrying failed requests to Management server | int32  |
| `debuggee_disabled_delay_ms`                         | amount of time in milliseconds to sleep before checking whether the debugger was enabled back | int32  |
| `lightrun_extra_class_path`                          | additional directories and files containing resolvable binaries | string |
| `lightrun_init_wait_time_ms`                         | timeout for wait iflightrun_wait_for_init is set             | int32  |
| `lightrun_wait_for_init`                             | ck application until first time of fetching breakpoints from the server | bool   |
| `enable_safe_caller`                                 | allows any method without side effects in expressions        | bool   |
| `extra_blocked_methods`                              | additional methods to block for testing purposes             | string |
| `extra_allowed_methods`                              | additional methods allowed for testing purposes              | string |
| `extra_whitelisted_classes`                          | internal names of additional classes to allow for testing purposes | string |
| `expression_max_classes_load_quota`                  | maximum number of classes that the Nano Java interpreter is allowed to load while evaluating a single breakpoint expression | int32  |
| `expression_max_interpreter_instructions_quota`      | maximum number of instructions that the Nano Java interpreter is allowed to execute while evaluating a single breakpoint expression | int32  |
| `pretty_printers_max_classes_load_quota`             | maximum number of classes that the Nano Java interpreter is allowed to load while formatting some well known data structures | int32  |
| `pretty_printers_max_interpreter_instructions_quota` | maximum number of instructions that the Nano Java interpreter is allowed to execute while formatting some well-known data structures | int32  |
| `dynamic_log_max_classes_load_quota`                 | maximum number of classes that the Nano Java interpreter is allowed to load while evaluating all expressions in a single dynamic log statement | int32  |
| `dynamic_log_max_interpreter_instructions_quota`     | maximum number of instructions that the Nano Java interpreter is allowed to execute while evaluating all expressions in a single dynamic log | int32  |
| `safe_caller_max_array_elements`                     | maximum allowed size of the array to copy or allocate in safe caller (copying or allocating larger arrays is considered to be too expensive MISSING | int32  |
| `safe_caller_max_interpreter_stack_depth`            | maximum stack depth that safe caller will allow              | int32  |
| `cdbg_description_suffix`                            | additional text to be appended to debug description          | string |
| `cdbg_class_files_cache_size`                        | cache size for class files used in safe method caller        | int32  |
| `cdbg_max_instructions_high`                         | use this value when ignoring quota                           | int32  |
| `cdbg_max_stack_depth`                               | maximum number of stack frames to unwind                     | int32  |


!!! example
     ```
     -agentpath:<pathtoagent>/lightrun_agent.so=--enable_safe_caller,--lightrun_init_wait_time_ms=999
     ```
