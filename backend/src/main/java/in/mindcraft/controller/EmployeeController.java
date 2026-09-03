package in.mindcraft.controller;

import in.mindcraft.entity.Employee;
import in.mindcraft.repository.EmployeeRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // ADMIN + USER
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // ADMIN + USER
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {

        return employeeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADMIN + USER
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Employee> createEmployee(
            @RequestBody Employee employee) {

        Employee savedEmployee = employeeRepository.save(employee);

        return ResponseEntity.ok(savedEmployee);
    }

    // ADMIN + USER
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {

        return employeeRepository.findById(id)
                .map(existingEmployee -> {

                    existingEmployee.setName(employee.getName());
                    existingEmployee.setEmail(employee.getEmail());
                    existingEmployee.setPhone(employee.getPhone());
                    existingEmployee.setAge(employee.getAge());
                    existingEmployee.setDepartment(employee.getDepartment());
                    existingEmployee.setSalary(employee.getSalary());
                    existingEmployee.setAadhar(employee.getAadhar());
                    existingEmployee.setPan(employee.getPan());
                    existingEmployee.setGender(employee.getGender());
                    existingEmployee.setJoiningDate(employee.getJoiningDate());
                    existingEmployee.setActiveEmployee(
                            employee.isActiveEmployee()
                    );

                    return ResponseEntity.ok(
                            employeeRepository.save(existingEmployee)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ONLY ADMIN
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id) {

        if (!employeeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        employeeRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}