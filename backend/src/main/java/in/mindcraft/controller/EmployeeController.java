package in.mindcraft.controller;

import in.mindcraft.entity.Employee;
import in.mindcraft.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/employees") @CrossOrigin(origins="http://localhost:4200")
public class EmployeeController {
 private final EmployeeService service;
 public EmployeeController(EmployeeService service){this.service=service;}
 @GetMapping public List<Employee> all(){return service.getAll();}
 @GetMapping("/{id}") public Employee one(@PathVariable Long id){return service.getById(id);}
 @PostMapping @PreAuthorize("hasAnyRole('ADMIN','USER')") public ResponseEntity<Employee> save(@Valid @RequestBody Employee e){return ResponseEntity.status(HttpStatus.CREATED).body(service.save(e));}
 @PutMapping("/{id}") @PreAuthorize("hasAnyRole('ADMIN','USER')") public Employee update(@PathVariable Long id,@Valid @RequestBody Employee e){return service.update(id,e);}
 @DeleteMapping("/{id}") @PreAuthorize("hasRole('ADMIN')") public ResponseEntity<Void> delete(@PathVariable Long id){service.delete(id);return ResponseEntity.noContent().build();}
}
