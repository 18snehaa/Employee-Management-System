package in.mindcraft.service;

import in.mindcraft.entity.Employee;
import in.mindcraft.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository repository;
    public EmployeeService(EmployeeRepository repository) { this.repository = repository; }
    public List<Employee> getAll() { return repository.findAll(); }
    public Employee getById(Long id) { return repository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found")); }
    public Employee save(Employee employee) { employee.setId(null); return repository.save(employee); }
    public Employee update(Long id, Employee data) {
        Employee e = getById(id);
        e.setName(data.getName()); e.setAadhar(data.getAadhar()); e.setPan(data.getPan()); e.setPhone(data.getPhone());
        e.setEmail(data.getEmail()); e.setSalary(data.getSalary()); e.setAge(data.getAge()); e.setDepartment(data.getDepartment());
        e.setGender(data.getGender()); e.setJoiningDate(data.getJoiningDate()); e.setActiveEmployee(data.isActiveEmployee());
        return repository.save(e);
    }
    public void delete(Long id) { if (!repository.existsById(id)) throw new RuntimeException("Employee not found"); repository.deleteById(id); }
}
